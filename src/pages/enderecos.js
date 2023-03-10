import { Button } from "@material-ui/core";
import { withIronSession } from "next-iron-session";
import { useState } from "react";
import GenericForm from "../components/generic-form";
import GenericList from "../components/generic-list";
import Header from "../components/header";

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user");

        if (!user) {
            res.statusCode = 403;
            return { props: {} };
        }

        return {
            props: { user },
        };
    },
    {
        cookieName: "test",
        cookieOptions: {
            secure: true,
        },
        password: "Gbm49ATjnqnkCCCdhV4uDBhbfnPqsCW0",
    }
);

const Enderecos = ({ theme, user, darkMode, setDarkMode }) => {
    const [isCadastro, setIsCadastro] = useState(user ? false : true);

    return (
        <>
            <Header
                theme={theme}
                user={user}
                darkMode={darkMode}
                toggleDarkMode={setDarkMode}
            />

            <Button onClick={() => setIsCadastro(!isCadastro)}>
                {isCadastro ? "Voltar" : "Adicionar novo"}
            </Button>

            {user && !isCadastro && <GenericList type="endereco" />}
            {isCadastro && <GenericForm type="endereco" />}
        </>
    );
};

export default Enderecos;
