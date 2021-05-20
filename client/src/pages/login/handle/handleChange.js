import React from "react";

function HandleChange (event) {
  const [target, setTarget] = React.useState({});

  React.useEffect(() => {
    setTarget({[event.target.name] : event.target.value})
  }, [])

};

export default HandleChange;
