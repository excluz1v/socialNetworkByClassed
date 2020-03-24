export default {
    palette: {
        primary: {
            main: "#1976d2",
            light: "#4791db",
            dark: "#115293",
            contrastText: "#fff"
        },
        secondary: {
            main: "#e33371",
            light: "#dc004e",
            dark: "#9a0036",
            contrastText: "#fff"
        }
    },
    similar: {
        form: {
            textAlign: 'center'
        },
        image: {
            width: 50,
            height: 50
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        TextField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        CustomError: {
            color: "red",
            fontSize: "0.8rem"
        },
        progress: {
            position: 'absolute'
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        sceleton: {
            card: {
                display: 'flex',
                marginBottom: 20
            },
            cardContent: {
                width: '100%',
                flexDirection: 'column',
                padding: 25
            },
            cover: {
                minWidth: 200,
                objectFit: "cover"
            },
            handle: {
                width: 60,
                height: 18,
                backgroundColor: '#1976d2',
                marginBottom: 7
            },
            date: {
                height: 14,
                width: 100,
                backgroundColor: 'rgba(0,0,0, 0.3)',
                marginBottom: 7
            },
            fullLine: {
                height: 15,
                width: '90%',
                marginBottom: 10,
                backgroundColor: 'rgba(0,0,0, 0.6)'
            },
            halfLine: {
                height: 15,
                width: '50%',
                marginBottom: 10,
                backgroundColor: 'rgba(0,0,0, 0.6)'
            }
        }
    }

}