const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/:token", async (req, res) => {
  const { token } = req.params; // Ambil token dari URL

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const fetch = (await import("node-fetch")).default; // Dynamic Import

    const apiUrl =
      "https://script.google.com/macros/s/AKfycbyHakLGB1HopAjBKEWFkRLUhURGrzed-EA0--NH6pkxQ5VRl1UrrrDQRqI9hIwrBuVTsw/exec";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
