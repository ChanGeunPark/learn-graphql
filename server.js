import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID): Tweet
  }
  type Mutation {
    postTweet(text: String, userId: ID!): Tweet
    deleteTweet(id: ID!): Boolean!
  }
`; //gql은 스키마를 설정해줘야한다.(type)
//서버에서 쿼리를 불러오면 값이 null이라고 뜨는데 API가 생긴 모양을 graphql에 설명해줘야 한다.
// [] 와 User는 관계에 따라 결정된다. User는 Tweet이 하나의 auther를 갖는다는 말이고 []는 여러개의 Tweet을 준다는 말이다.

// post를 하려면 Mutation type을 사용해야 한다. user가 tweet을 post하려 하려면, tweet의 내용을 줘야한다.

const server = new ApolloServer({ typeDefs }); //Query type없이는 서버가 시작하지 않는다.

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
