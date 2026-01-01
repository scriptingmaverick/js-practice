const contentsOf = (file) =>
  Deno.readTextFile(file + ".txt").then((x) => x.split(",\r\n"));

const parseNameIn = (data) => data.slice(data.lastIndexOf("/") + 1);

const delay = (time) => new Promise((res) => setTimeout(res, time));

const startOf = (task) => console.log("\nstarted ->", task);
const endOf = (task) => console.log("ended ->", task);

const execute = async (tasks) => {
  const log = [];
  const type = tasks.length === 1 ? "serial" : "parallel";
  const p = tasks.map(async (task) => {
    const taskName = parseNameIn(task);
    const start = Date.now();

    startOf(taskName);
    await delay(500);

    const data = await Deno.readTextFile(task + ".txt");
    const end = Date.now();
    log.push({ type, msg: data.trim(), duration: end - start });

    endOf(taskName);
  });

  await Promise.all(p);
  return log;
};

const cookRecipe = async (recipeFile) => {
  const recipeName = parseNameIn(recipeFile);
  startOf(recipeName);

  const tasks = await contentsOf(recipeFile);
  const mainLog = [];

  for (const task of tasks) {
    mainLog.push(await execute(task.split(",")));
    await new Promise((res) => setTimeout(res, 500));
  }

  console.log(mainLog.flat());
  return Promise.resolve(true);
};

const getSubAndType = (result) =>
  result.length > 1 ? ["recipes", "parallelly"] : ["recipe", "serially"];

const returnFeed = (result) => {
  const [subject, type] = getSubAndType(result);
  console.log(subject, "done", type, "\n");
};

const runManifest = async (manifestFile) => {
  const manifests = await contentsOf(manifestFile);

  for (const manifest of manifests) {
    const recipes = manifest.split(",");
    const result = await Promise.all(
      recipes.map((recipe) => cookRecipe(recipe))
    );

    returnFeed(result);
    await delay(1000);
  }

  console.log(`\nDone manifest.`);
};

runManifest("./manifest");
