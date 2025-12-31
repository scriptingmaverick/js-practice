const execute = (tasks) => {
  const log = [];
  tasks.forEach(async (task) => {
    const start = Date.now();
    await setTimeout(async () => {
      const end = Date.now();
      const data = await Deno.readTextFile(task + ".txt").then((x) => x.trim());
      log.push({ msg: data, duration: end - start });
    }, 1000);
  });

  console.log(tasks, log);
};

execute(["./tasks/task1", "./tasks/task2"]);
execute(["./tasks/task3"]);
