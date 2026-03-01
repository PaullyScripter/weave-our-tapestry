export const db = {
  users: [
    {
      id: "1",
      username: "paulNG",
      creationDate: "2024-06-01T12:00:00Z",
      email: "abc@gmail.com",
      phone: null,
      totalLikesReceived: 100,
      totalCommentsReceived: 2,
      contributions: [
        {
          storyID: "1",
          storyTitle: "Thanh Giong Legend",
          storyType: "Legend",
          cultureofOrigin: "Vietnamese",
          countryofOrigin: "Vietnam",
          contributionDate: "2024-06-02T12:00:00Z",
          likesReceived: 100,
          content:
            "Thánh Gióng is a legendary Vietnamese hero. Long ago, in the Hùng Kings’ time, a three-year-old boy in Phù Đổng could not speak or walk. When enemy invaders threatened the country, the king called for a hero. Suddenly, the boy spoke and asked for an iron horse, iron armor, and an iron spear. After eating enormous amounts of food, he grew into a giant warrior. Riding his iron horse, which breathed fire, he defeated the invaders. When his spear broke, he used bamboo to continue fighting. After victory, he rode to a mountain and flew into the sky, becoming a sacred immortal hero.",
          comment: [
            {
              commentID: "1",
              commenterUsername: "johnDoe",
              commentUserid: "2",
              commentDate: "2024-06-03T12:00:00Z",
              content: "Great story!",
            },
            {
              commentID: "2",
              commenterUsername: "janeSmith",
              commentUserid: "3",
              commentDate: "2024-06-04T12:00:00Z",
              content: "I love this!",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      username: "johnDoe",
      creationDate: "2024-06-10T12:00:00Z",
      email: "abcalt@gmail.com",
      phone: "123-456-7890",
      totalLikesReceived: 5,
      totalCommentsReceived: 1,
      contributions: [
        {
          storyID: "2",
          storyTitle: "The Monkey King",
          storyType: "Legend",
          cultureofOrigin: "China",
          countryofOrigin: "China",
          contributionDate: "2024-06-11T12:00:00Z",
          likesReceived: 5,
          content:
            "The Monkey King, Sun Wukong, is a famous hero from the Chinese novel Journey to the West. Born from a magical stone, he gained supernatural powers, including immense strength, shape-shifting, and the ability to travel 108,000 miles in one leap. He wielded a magical staff that could change size and fought powerful enemies. After rebelling against Heaven, the Buddha imprisoned him under a mountain for 500 years. Later, he was released to protect the monk Xuanzang on a journey to India to retrieve sacred scriptures. Through battles and challenges, Sun Wukong learned discipline and loyalty, eventually achieving enlightenment.",
          comment: [
            {
              commentID: "13",
              commenterUsername: "paulNG",
              commentUserid: "1",
              commentDate: "2024-06-12T12:00:00Z",
              content: "I have heard this before!",
            },
          ],
        },
      ],
    },
  ],
} as const;