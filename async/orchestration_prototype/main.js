const execute = async (tasks) => {
  const log = [];
  const type = tasks.length === 1 ? "serial" : "parallel";
  const p = tasks.map(async (task) => {
    const start = Date.now();
    console.log(task, " started");
    await new Promise((res) => setTimeout(res, 500));
    const data = await Deno.readTextFile(task + ".txt");
    const end = Date.now();
    console.log(task, "ended");
    log.push({ type, msg: data.trim(), duration: end - start });
  });

  await Promise.all(p);
  return log;
};

const runAll = async (recipeFile) => {
  const recipe = await Deno.readTextFile(recipeFile + ".txt");
  const tasks = recipe.split(",\r\n");
  const mainLog = [];
  for (const task of tasks) {
    mainLog.push(await execute(task.split(",")));
    await new Promise((res) => setTimeout(res, 100));
  }

  const recipeName = recipeFile.slice(recipeFile.lastIndexOf("/") + 1);
  console.log(mainLog.flat());
  return Promise.resolve(`\nDone Recipe -> ${recipeName}.`);
};

console.log(await runAll(`./recipes/recipe1`));
