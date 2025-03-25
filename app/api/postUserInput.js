import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userInput = req.body;

      // Get the file path
      const filePath = path.join(process.cwd(), "data.json");

      // Read the current data
      const fileData = await fs.readFile(filePath, "utf8");
      const jsonData = JSON.parse(fileData);

      // Add the new input to the data
      jsonData.push(userInput);

      // Write back the updated data
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

      res.status(200).json({ message: "Data added successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update the JSON file." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
