const parse = (data) =>
  data.split(/\r\n\r\n/).map((x) => x.split(/\n| /).map((y) => y.trim()));
// data.split(/\n\n/).map((x) => x.split(/\n| /).map((y) => y.trim()));

const validateYear = (min, max, year) => {
  if (year.length > 4) return;
  if (isNaN(+year)) return;
  return +year >= min && +year <= max;
};

const validateHCL = (color) => color.match(/^#[0-9a-f]{6}$/) !== null;

const validatePID = (id) => id.match(/^\d{9}$/) !== null;

const validateECL = (color) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(color);

const validateHGT = (height) => {
  if (height.length < 4 || height.length > 6) return;
  const metric = height.slice(-2);
  const length = +height.slice(0, -2);
  if (metric === "cm") return length <= 193 && length >= 150;
  if (metric === "in") return length <= 76 && length >= 59;
};

const validate = (passport) => {
  const validatedDetails = [];
  const validateDetailsOf = {
    byr: validateYear.bind(null, 1920, 2002),
    iyr: validateYear.bind(null, 2010, 2020),
    eyr: validateYear.bind(null, 2020, 2030),
    hcl: validateHCL,
    ecl: validateECL,
    pid: validatePID,
    hgt: validateHGT,
    cid: () => true,
  };

  for (let i = 0; i < passport.length; i++) {
    const [field, value] = passport[i].split(":");
    // console.log(field, value, validateDetailsOf[field](value));
    if (validateDetailsOf[field](value)) validatedDetails.push(passport[i]);
  }
  // console.log(
  //   "passport : ",
  //   passport,
  //   "\nvalidated details : ",
  //   validatedDetails
  // );
  return validatedDetails;
};

const process = (passportData) => {
  const passports = parse(passportData);
  let validPassports = 0;
  for (let i = 0; i < passports.length; i++) {
    const validatedPassport = validate(passports[i]);

    if (validatedPassport.length === 8) {
      validPassports++;
      continue;
    }

    if (
      validatedPassport.length === 7 &&
      validatedPassport.filter((x) => x.includes("cid")).length === 0
    ) {
      validPassports++;
      continue;
    }
  }

  return validPassports;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt");
  const example = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

  const exm = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

  const e = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

  return process(input);
};

console.log(main());
