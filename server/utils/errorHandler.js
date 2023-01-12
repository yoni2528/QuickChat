class CustomeError extends Error {
  constructor(title, message) {
    super(message);
    this.message = message;
    this.title = title;
  }
}

module.exports = CustomeError;
