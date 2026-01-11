await Deno.writeTextFile("locked.txt", "This is secret data.");

// Change permissions to Read-Only (0o400)
await Deno.chmod("locked.txt", 0o400);
console.log("File is now locked.");

try {
  // Try to open it for writing - this should crash!
  await Deno.open("locked.txt", { write: true });
} catch (err) {
  console.log("🚫 Access Denied! The system says:", err.message);
}

// To clean up, you'll need to unlock it first:
// await Deno.chmod("locked.txt", 0o644);