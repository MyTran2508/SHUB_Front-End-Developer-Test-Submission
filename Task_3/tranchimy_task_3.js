fetch("https://share.shub.edu.vn/api/intern-test/input")
  .then((response) => response.json())
  .then((result) => {
    const { token, data, query } = result;

    if (!data) {
      console.log("Data not found");
      return;
    }
    if (!query) {
      console.log("Query not found");
      return;
    }
    if (!token) {
      console.log("Token not found");
      return;
    }

    const output = calculate(query, data);

    if (!output) {
      console.log("Output not found");
      return;
    }

    fetch("https://share.shub.edu.vn/api/intern-test/output", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(output),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function calculate(query, data) {
  const results = [];
  query.forEach(({ type, range }) => {
    const [l, r] = range;

    if (type === "1") {
      const sum = data.slice(l, r + 1).reduce((a, b) => a + b, 0);
      results.push(sum);
    } else if (type === "2") {
      let sum = 0;
      for (let i = l; i <= r; i++) {
        sum += (i % 2 === 0 ? 1 : -1) * data[i];
      }
      results.push(sum);
    }
  });

  return results;
}
