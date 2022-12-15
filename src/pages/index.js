import { Paper, Typography } from "@material-ui/core";
import { withIronSession } from "next-iron-session";
import Image from "next/image";
import Header from "../components/header";
import { defaultStyles } from "../styles";

const Item = ({ item, index, style }) => (
    <>
        <section className={style.fastAnimation}>
            <Paper className={style.background} elevation={24}>
                <Typography
                    className={`${style.title} ${style.titleDesc} ${style.fadeLeftAnimation}`}
                    variant="h1"
                >
                    {item.first}
                </Typography>
                <Typography
                    className={`${style.subtitle} ${style.subtitleDesc} ${style.fadeRightAnimation}`}
                    variant="h1"
                >
                    {item.second}
                </Typography>
                <Typography
                    className={`${style.description} ${style.fadeLeftAnimation}`}
                    variant="h2"
                >
                    {item.description}
                </Typography>
                <Image
                    className={style.image}
                    src={`/assets/bg${index}.jpg`}
                    layout="fill"
                />
            </Paper>
        </section>
    </>
);

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
        cookieName: "MYSITECOOKIE",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production" ? true : false,
        },
        password: process.env.APPLICATION_SECRET,
    }
);

const Home = ({ theme, user, darkMode, setDarkMode }) => {
    const style = defaultStyles();

    const texts = [
        {
            second: "Clinica Bem-Estar",
            description:
                "Clínica Bem-Estar sempre de braços abertos para receber todo mundo e cuidar da saúde de todos, com uma ótima estrutura e funcionários exemplares.",
        },
        {
            second: "Funcionários Exemplares",
        },
        {
            second: "Sala de Espera",
            description:
                "Sala de Espera conta com ótimo conforto e o refresco de um ar-condicionado gelado.",
        },
    ];

    return (
        <>
            <Header
                theme={theme}
                user={user}
                darkMode={darkMode}
                toggleDarkMode={setDarkMode}
            />
            <section className={style.fastAnimation}>
                <Paper className={style.background} elevation={24}>
                    <Typography
                        className={`${style.title} ${style.fadeLeftAnimation}`}
                        style={{ color: "#f40141", opacity: 1 }}
                        variant="h1"
                    >
                        Clínica
                    </Typography>
                    <Typography
                        className={`${style.subtitle} ${style.fadeRightAnimation}`}
                        style={{ color: "#f40141", opacity: 1 }}
                        variant="h1"
                    >
                        Bem-Estar
                    </Typography>
                    <Image src="/assets/bg.jpg" layout="fill" />
                </Paper>
            </section>
            {texts.map((item, index) => (
                <Item key={index} item={item} index={index + 2} style={style} />
            ))}
        </>
    );
};

export default Home;
