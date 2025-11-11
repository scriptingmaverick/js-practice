const OBJECT_1 = { page: 10, chapter: "Building webpages" };
const OBJECT_2 = {
  name: "Ravi",
  age: 21,
  address: { pincode: 123456, location: "Hyderabad" },
};

const isObject = (object) => typeof object === "object";

const isEqual = (object1, object2) => {
  for (const [key, value] of Object.entries(object1)) {
    if (isObject(value) && isObject(object2[key])) {
      if (isEqual(value, object2[key])) {
        continue;
      }
      return false;
    } else if (isObject(value) || isObject(object2[key])) {
      return false;
    }

    if (value === object2[key]) continue;
    return false;
  }

  return true;
};

console.log(isEqual(OBJECT_1, OBJECT_2));
