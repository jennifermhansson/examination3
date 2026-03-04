export const postIdParamsSchema = {
  type: "object",
  required: ["postId"],
  properties: {
    postId: { type: "integer", minimum: 1 },
  },
};

export const createCommentSchema = {
  params: postIdParamsSchema,
  body: {
    type: "object",
    required: ["comment"],
    additionalProperties: false,
    properties: {
      comment: { type: "string", minLength: 1, maxLength: 1000 },
    },
  },
};

export const commentIdSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1 }
    }
  }
};