import {
  AppBar,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import HeaderText from "./components/HeaderText";
import Transfer from "./components/Transfer";
import { useBetaContext } from "./contexts/BetaContext";
import { setMerchantId } from "./store/transferSlice";
import { CLUSTER } from "./utils/consts";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "transparent",
    marginTop: theme.spacing(2),
    "& > .MuiToolbar-root": {
      margin: "auto",
      width: "100%",
      maxWidth: 1440,
    },
  },
  spacer: {
    flex: 1,
    width: "100vw",
  },
  link: {
    ...theme.typography.body2,
    fontWeight: 600,
    fontFamily: "Suisse BP Intl, sans-serif",
    color: "white",
    marginLeft: theme.spacing(4),
    textUnderlineOffset: "6px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
    },
    "&.active": {
      textDecoration: "underline",
    },
  },
  bg: {
    // background:
    //   "linear-gradient(160deg, rgba(69,74,117,.1) 0%, rgba(138,146,178,.1) 33%, rgba(69,74,117,.1) 66%, rgba(98,104,143,.1) 100%), linear-gradient(45deg, rgba(153,69,255,.1) 0%, rgba(121,98,231,.1) 20%, rgba(0,209,140,.1) 100%)",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  brandLink: {
    display: "inline-flex",
    alignItems: "center",
    "&:hover": {
      textDecoration: "none",
    },
  },
  iconButton: {
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
    },
  },
  betaBanner: {
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: theme.spacing(1, 0),
  },
  wormholeIcon: {
    height: 68,
    "&:hover": {
      filter: "contrast(1)",
    },
    verticalAlign: "middle",
    marginRight: theme.spacing(1),
    display: "inline-block",
  },
  gradientRight: {
    position: "absolute",
    top: "72px",
    right: "-1000px",
    width: "1757px",
    height: "1506px",
    background:
      "radial-gradient(closest-side at 50% 50%, #FFCE00 0%, #FFCE0000 100%)",
    opacity: "0.2",
    transform: "matrix(0.87, 0.48, -0.48, 0.87, 0, 0)",
    zIndex: "-1",
    pointerEvent: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gradientLeft: {
    top: "-530px",
    left: "-350px",
    width: "1379px",
    height: "1378px",
    position: "absolute",
    background:
      "radial-gradient(closest-side at 50% 50%, #F44B1B 0%, #F44B1B00 100%)",
    opacity: "0.2",
    zIndex: "-1",
    pointerEvent: "none",
  },
  gradientLeft2: {
    bottom: "-330px",
    left: "-350px",
    width: "1379px",
    height: "1378px",
    position: "absolute",
    background:
      "radial-gradient(closest-side at 50% 50%, #F44B1B 0%, #F44B1B00 100%)",
    opacity: "0.2",
    zIndex: "-1",
    pointerEvent: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gradientRight2: {
    position: "absolute",
    bottom: "-900px",
    right: "-1000px",
    width: "1757px",
    height: "1506px",
    background:
      "radial-gradient(closest-side at 50% 50%, #FFCE00 0%, #FFCE0000 100%)",
    opacity: "0.24",
    transform: "matrix(0.87, 0.48, -0.48, 0.87, 0, 0);",
    zIndex: "-1",
    pointerEvent: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function App() {
  const classes = useStyles();
  const isBeta = useBetaContext();
  const dispatch = useDispatch();

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const pathMerchantId = query.get("merchantId");

  useEffect(() => {
    dispatch(setMerchantId(pathMerchantId));
  }, [pathMerchantId, dispatch]);

  return (
    <div className={classes.bg}>
      {CLUSTER === "mainnet" ? null : (
        <AppBar position="static" className={classes.betaBanner} elevation={0}>
          <Typography style={{ textAlign: "center" }}>
            Caution! You are using the {CLUSTER} build of this app.
          </Typography>
        </AppBar>
      )}
      {isBeta ? (
        <AppBar position="static" className={classes.betaBanner} elevation={0}>
          <Typography style={{ textAlign: "center" }}>
            Caution! You have enabled the beta. Enter the secret code again to
            disable.
          </Typography>
        </AppBar>
      ) : null}
      <Container maxWidth="md" style={{ paddingBottom: 24 }}>
        <HeaderText
          white
          subtitle={
            <>
              <Typography>
                Pay with any asset using the Portal Bridge (built on wormhole)
              </Typography>
            </>
          }
        >
          xPay
        </HeaderText>
        <Tabs
          value={"transfer"}
          variant="fullWidth"
          indicatorColor="primary"
        >
          <Tab label="Pay With Wormhole Token Bridge" value="transfer" />
        </Tabs>
      </Container>
      <Transfer />
      <div className={classes.spacer} />
      <div className={classes.gradientRight}></div>
      <div className={classes.gradientRight2}></div>
      <div className={classes.gradientLeft}></div>
      <div className={classes.gradientLeft2}></div>
      <Footer />
    </div>
  );
}

export default App;
