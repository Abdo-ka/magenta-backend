function excludeFieldsFromSchema(schema) {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      return ret;
    },
  });

  schema.set('toObject', {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      return ret;
    },
  });
}

module.exports = excludeFieldsFromSchema;
