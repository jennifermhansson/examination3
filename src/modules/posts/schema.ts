const postBodySchema = {
  type: "object",
  required: ["title", "content"],
  properties: {
    title: { type: "string", minLength: 3, maxLength: 100 },
    content: { type: "string", minLength: 1 },
  },
};

export const createPostSchema = {
  body: postBodySchema,
};

export const postIdSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1 }
    }
  }
};

export const updatePostSchema = {
  params: postIdSchema.params,
  body: postBodySchema,
};