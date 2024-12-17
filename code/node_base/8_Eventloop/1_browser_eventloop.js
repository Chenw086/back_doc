/* setTimeout(() => {
  console.log("s1");
  Promise.resolve().then(() => {
    console.log("p1");
  });
  Promise.resolve().then(() => {
    console.log("p2");
  });
});

setTimeout(() => {
  console.log("s2");
  Promise.resolve().then(() => {
    console.log("p3");
  });
  Promise.resolve().then(() => {
    console.log("p4");
  });
}); */

/*  
    s1
    p1
    p2
    s2
    p3
    p4
*/

/* **************************** 上下不相关 ************************** */

/* setTimeout(() => {
  console.log("s3");
  Promise.resolve().then(() => {
    console.log("p5");
  });
  Promise.resolve().then(() => {
    console.log("p6");
  });
});

Promise.resolve().then(() => {
  console.log("p7");
  setTimeout(() => {
    console.log("s4");
  });
}); */

/*  
    p7
    s3
    p5
    p6
    s4
*/
