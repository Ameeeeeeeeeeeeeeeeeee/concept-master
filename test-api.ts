async function testApi() {
  console.log("Testing API Endpoint...");
  try {
    const response = await fetch("http://localhost:3000/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        concept: "Gravity",
        action: "explain",
        grade: 10,
        subject: "Physics",
      }),
    });

    console.log("Status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error Body:", errorText);
    } else {
      const text = await response.text();
      console.log("Success! Response length:", text.length);
      console.log("Snippet:", text.substring(0, 100));
    }
  } catch (error: any) {
    console.error("Fetch failed:", error.message);
  }
}

testApi();
