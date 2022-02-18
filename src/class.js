export default class Task {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }

  set updatedIndex(newIndex) {
    this.index = newIndex;
  }

  set updatedDesc(newDesc) {
    this.description = newDesc;
  }
}
