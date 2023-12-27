const getSessionErrorData = (req, defaultValues) => {
    let sessionInputData = req.session.inputData;
    
      if (!sessionInputData) {
        sessionInputData = {
          hasError: false,
          ...defaultValues
        };
      }
    
      req.session.inputData = null;

      return sessionInputData;
}


const flashErrorsToSession = (req, data, action) => {
    req.session.inputData = {
        hasError: true,
        ...data
      };

      req.session.save(action);
}





module.exports = {  //We export this in an object so that we can group multiple exported functions together.
    getSessionErrorData: getSessionErrorData,
    flashErrorsToSession: flashErrorsToSession
}