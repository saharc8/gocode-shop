import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loading() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={"loader"}>
      <CircularProgress size="100px" />
      <CircularProgress color="secondary" size="100px" />
    </div>
  );
}

export default Loading;
