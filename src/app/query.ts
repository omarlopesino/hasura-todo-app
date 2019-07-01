import gql from 'graphql-tag';
/**
 * Add a task to the system.
 */
export const AddTasks = gql`
  mutation addTasks($tasks: [task_insert_input!]!) {
    insert_task(objects: $tasks) {
      returning {
        name
        completed
        id
      }
    }
  }
`;

/**
 * Allow subscribe to all tasks.
 */
export const SubscribeTasks = gql`
subscription subscribeTasks{
  task {
    name
    completed
    id
  }
}
`;