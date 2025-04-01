
const books = [];

async function booksMemoryRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    return books;
    //reply.code(404).send({ error: 'Not implemented' });
  });

  const getBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.get('/:id', { schema: getBookSchema }, async (request, reply) => {
    return books[id-1]
    //reply.code(404).send({ error: 'Not implemented' });
  });

  const createBookSchema = {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
    const {title, author} = request.body;
    const newBook = {title : title, author : author, id:books.lenght}
    books.push(newBook)
    reply.code(201).send(newBook)

  });

  const updateBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.put('/:id', { schema: updateBookSchema }, async (request, reply) => {
    const {title, author} = request.body;
    books[id-1] = {title : title, author : author, id : id}
    reply.code(201).send(books[id-1])
    //reply.code(404).send({ error: 'Not implemented' });
  });

  const deleteBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  fastify.delete('/:id', { schema: deleteBookSchema }, async (request, reply) => {
    for (let i = id; i<books.lenght; i++){
      books[i-1] = books[i].copy()
    }
    books.pop()
  });
}

export default booksMemoryRoute;