const { GraphQLServer } = require('graphql-yoga')



let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (id) => links.filter((link) => link.id === id ? link : null),
  },


  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (root, args) => {

      let link = links.filter((link) => link.id === args.id ? link : null)

       link = {
        id: args.id,
        url: args.url,
        description: args.description,
      }

      return link
    }


  },


}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
