let page_visits = {};
let middlewareCount = function (req, res, next) {
  let counter = page_visits[req.originalUrl];
  if(counter || counter === 0) {
    page_visits[req.originalUrl] = counter + 1;
  } else {
    page_visits[req.originalUrl] = 1;
  }
  console.log(req.originalUrl, counter);
  next();
};

export default middlewareCount;
