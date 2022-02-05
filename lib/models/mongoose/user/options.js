export default {
    read: 'secondaryPreferred',
    toObject: {
        virtuals: true,
        getters: true,
    },
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
};
