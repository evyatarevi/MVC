const postIsValid = (enteredTitle, enteredContent) => {
  return (
    enteredTitle &&
    enteredContent &&
    !enteredTitle.trim() === "" &&
    !enteredContent.trim() === ""
  );
};



module.exports = {
    postIsValid: postIsValid
}