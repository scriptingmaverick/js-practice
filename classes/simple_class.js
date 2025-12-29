class Mobile {
  #IMEID = 0;
  #name;
  #model;
  #series;

  constructor(name, model, series) {
    this.#IMEID = ++this.#IMEID;
    this.#model = model;
    this.#name = name;
    this.#series = series;
  }

  nameOf = () => this.#name;
  modelOf = () => this.#model;
  seriesOf = () => this.#series;

  information() {
    return `${this.#name} has  a brand new ${this.#model} model, in ${this.#series} series.`;
  }

  information = () =>
    `${this.#name} has launched a brand new ${this.#model} model, in ${this.#series} series.`;
}

const mobile = new Mobile("Poco", "X5", "X");

console.log(mobile.nameOf());
console.log(mobile.modelOf());
console.log(mobile.seriesOf());
console.log(mobile.information());
