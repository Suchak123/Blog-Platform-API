import Joi from 'joi';

const BlogValidation = {
    create: Joi.object({
        title: Joi.string().required().max(200),
        description: Joi.string().required().max(500).trim(),
        tags: Joi.array().items(Joi.string().trim().lowercase()),
    }),

    update: Joi.object({
        title: Joi.string().max(200),
        description: Joi.string().max(500).trim(),
        tags: Joi.array().items(Joi.string().trim().lowercase()),
    }),

    comment: Joi.object({
        author: Joi.string().required().trim(),
        content: Joi.string().required().trim()
    })
};

const UserValidation = {
    register: Joi.object({
        username: Joi.string().required().min(3).max(30).trim(),
        email: Joi.string().required().email().trim().lowercase(),
        password: Joi.string().required().min(7)
    }),

    login: Joi.object({
        email: Joi.string().required().email().trim().lowercase(),
        password: Joi.string().required()
    }) 
};

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        next();
    }
}

export {
    BlogValidation,
    UserValidation,
    validate
}

