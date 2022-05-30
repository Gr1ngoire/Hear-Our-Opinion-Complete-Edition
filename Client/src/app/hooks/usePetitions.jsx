import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import petitionService from "../services/petitionService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";

const PetitionsContext = React.createContext();

export const usePetitions = () => {
    return useContext(PetitionsContext);
};

export const PetitionsProvider = ({ children }) => {
    const [petitions, setPetitions] = useState();
    const [petitionById, setPetitionById] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    function errorCatcher(error) {
        const { data } = error.response;

        if (!data) {
            return;
        }

        const errMessageRegExpFilter = /:&quot;.+&quot;/i;
        const message = errMessageRegExpFilter
            .exec(data)[0]
            .replace(":&quot;", "")
            .replace("&quot;", "");
        toast.error(message);
        setError(message);
    }

    async function getPetitions() {
        const token = await getAccessTokenSilently();
        try {
            const { content } = await petitionService.fetchAll(token);
            setPetitions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getPetitionById(id) {
        const token = await getAccessTokenSilently();
        try {
            const { content } = await petitionService.getById(id, token);
            setIsLoading(false);
            setPetitionById(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function createPetition(payload) {
        const token = await getAccessTokenSilently();
        try {
            const { content } = await petitionService.create(payload, token);
            setPetitions((prevState) => [...prevState, content]);
            setIsLoading(false);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function updatePetition(payload) {
        const token = await getAccessTokenSilently();
        try {
            const { content } = await petitionService.update(payload, token);
            setPetitions((prevState) =>
                prevState.map((petition) =>
                    petition.id === content.id ? content : petition
                )
            );
            setPetitionById(content);
            setIsLoading(false);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function deletePetition(id) {
        const token = await getAccessTokenSilently();
        try {
            const { content } = petitionService.delete(id, token);
            setPetitions((prevState) =>
                prevState.filter((petition) => petition.id !== id)
            );
            setIsLoading(false);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <PetitionsContext.Provider
            value={{
                isLoading,
                petitions,
                petitionById,
                setPetitions,
                error,
                getPetitions,
                getPetitionById,
                createPetition,
                updatePetition,
                deletePetition
            }}
        >
            {children}
        </PetitionsContext.Provider>
    );
};

PetitionsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
