export class WrongCredentialsError extends Error {
  name = WrongCredentialsError.name;

  private constructor(...args) {
    super(...args);
  }

  static async create() {
    return new this(await this.createMessage());
  }

  private static async createMessage() {
    return 'Wrong Credentials';
  }
}
