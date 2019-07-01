/**
 * Represent a task.
 */
export class Task {

  /**
   * Task title.
   *
   * @protected
   * @type {String}
   * @memberof Task
   */
  protected name: String;

  /**
   * Task is complete.
   *
   * @protected
   * @type {boolean}
   * @memberof Task
   */
  protected complete: boolean;

  protected id: Number;

  /**
   * Creates an instance of Task.
   *
   * @param {String} title
   * @param {boolean} complete
   * @memberof Task
   */
  constructor(title: String, complete: boolean, id: Number) {
    this.name = title;
    this.complete = complete;
    this.id = id;
  }

  /**
   * Get task title.
   *
   * @returns {String}
   * @memberof Task
   */
  public getTitle() : String {
    return this.name;
  }

  /**
   * Indicate the task has been completed or not.
   *
   * @returns {boolean}
   * @memberof Task
   */
  public isCompleted() : boolean {
    return this.complete;
  }

  /**
   * Get task identifier.
   *
   * @returns
   * @memberof Task
   */
  public getId() {
    return this.id;
  }

}
