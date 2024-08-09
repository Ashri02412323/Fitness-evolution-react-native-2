import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import ProfilePic from '../../assets/images/profilePic.png';
import {PortableText} from '@portabletext/react'
import Octicons from '@expo/vector-icons/Octicons';
const BlogPage = () => {
    const {title} = useGlobalSearchParams();
    const sampleData = [
      {
        "markDefs": [],
        "children": [
          {
            "text": "Making a cake involves several steps including preparing the ingredients, mixing them properly, and baking the cake. Here's a basic recipe for a simple vanilla cake:",
            "_key": "b0dc619616cb0",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block",
        "style": "normal",
        "_key": "efd6c238c5e6"
      },
      {
        "markDefs": [],
        "children": [
          {
            "text": "Ingredients:",
            "_key": "ddbb2c099e270",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block",
        "style": "h3",
        "_key": "bf7b6dfb9b0c"
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "10e269e275cf",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "text": "1 cup (226 grams) unsalted butter, softened",
            "_key": "79da7d70f0030",
            "_type": "span",
            "marks": []
          }
        ],
        "level": 1
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "76c37dce5086",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_key": "092b54e0922e0",
            "_type": "span",
            "marks": [],
            "text": "1 1/2 cups (300 grams) granulated sugar"
          }
        ],
        "level": 1
      },
      {
        "_key": "d1ae9e0d453d",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "4 large eggs, at room temperature",
            "_key": "40107c3f41290"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal"
      },
      {
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "2 teaspoons vanilla extract",
            "_key": "0caeae12511c0"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "0a41379a5c6a",
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "3 cups (360 grams) all-purpose flour",
            "_key": "62fef4ecb2310"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "8db4eb80ac59",
        "listItem": "bullet",
        "markDefs": []
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "b01b808a8355",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "text": "1 tablespoon baking powder",
            "_key": "f51b83f42bab0",
            "_type": "span",
            "marks": []
          }
        ],
        "level": 1
      },
      {
        "style": "normal",
        "_key": "cb54fb2870d9",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "1/2 teaspoon salt",
            "_key": "7389e288a2bf0"
          }
        ],
        "level": 1,
        "_type": "block"
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "b8fc1ba1a742",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "1 cup (240 ml) whole milk, at room temperature",
            "_key": "5088166d2e840"
          }
        ],
        "level": 1
      },
      {
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Instructions:",
            "_key": "e11e2db3ff420"
          }
        ],
        "_type": "block",
        "style": "h3",
        "_key": "1b53d6bc7124"
      },
      {
        "_type": "block",
        "style": "h4",
        "_key": "bc3f75090fab",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "1. Preheat the Oven:",
            "_key": "0f1234673d3e0"
          }
        ]
      },
      {
        "_key": "93c5291fae5e",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Preheat your oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
            "_key": "7401e87752e80"
          }
        ],
        "_type": "block",
        "style": "normal"
      },
      {
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "2. Prepare the Dry Ingredients:",
            "_key": "8cdf19b5df760"
          }
        ],
        "_type": "block",
        "style": "h4",
        "_key": "6e1d52920e3f"
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "12f6f5c2928b",
        "markDefs": [],
        "children": [
          {
            "text": "In a medium bowl, whisk together the flour, baking powder, and salt. Set aside.",
            "_key": "1898f0a72e2f0",
            "_type": "span",
            "marks": []
          }
        ]
      },
      {
        "style": "h4",
        "_key": "feb3173ff7f9",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "3. Cream the Butter and Sugar:",
            "_key": "ee0dcea40fdf0"
          }
        ],
        "_type": "block"
      },
      {
        "markDefs": [],
        "children": [
          {
            "text": "In a large mixing bowl, using an electric mixer, beat the butter on medium speed until creamy, about 1-2 minutes. Add the sugar and beat until light and fluffy, about 2-3 minutes.",
            "_key": "fc8b6f89f6070",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block",
        "style": "normal",
        "_key": "66196c830a91"
      },
      {
        "style": "h4",
        "_key": "2db77b1a585b",
        "markDefs": [],
        "children": [
          {
            "text": "4. Add the Eggs and Vanilla:",
            "_key": "5bd2dbb0626d0",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block"
      },
      {
        "style": "normal",
        "_key": "0eb039542abf",
        "markDefs": [],
        "children": [
          {
            "text": "Add the eggs one at a time, beating well after each addition. Mix in the vanilla extract.",
            "_key": "c00a9b93ee0b0",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block"
      },
      {
        "children": [
          {
            "marks": [],
            "text": "5. Combine Wet and Dry Ingredients:",
            "_key": "df428d4e65880",
            "_type": "span"
          }
        ],
        "_type": "block",
        "style": "h4",
        "_key": "55974f4a7dbe",
        "markDefs": []
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "8e2ac6f38375",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Gradually add the flour mixture to the butter mixture, alternating with the milk. Begin and end with the flour mixture. Mix each addition until just combined. Do not overmix.",
            "_key": "f9030ba2d4580"
          }
        ]
      },
      {
        "_type": "block",
        "style": "h4",
        "_key": "3839850dbe46",
        "markDefs": [],
        "children": [
          {
            "text": "6. Divide and Bake:",
            "_key": "24b10a1eafd00",
            "_type": "span",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "0e149fcfed85",
        "markDefs": [],
        "children": [
          {
            "marks": [],
            "text": "Divide the batter evenly between the prepared cake pans and smooth the tops with a spatula. Bake in the preheated oven for 25-30 minutes, or until a toothpick inserted into the center comes out clean.",
            "_key": "8d1167eac7f80",
            "_type": "span"
          }
        ]
      },
      {
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "7. Cool the Cakes:",
            "_key": "ecaa21fa62240"
          }
        ],
        "_type": "block",
        "style": "h4",
        "_key": "4e533a01d851"
      },
      {
        "children": [
          {
            "text": "Allow the cakes to cool in the pans for about 10 minutes. Then, remove the cakes from the pans and transfer them to a wire rack to cool completely.",
            "_key": "24fc38e6faea0",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block",
        "style": "normal",
        "_key": "62daac59de96",
        "markDefs": []
      },
      {
        "children": [
          {
            "text": "Frosting (Optional):",
            "_key": "5ece278949ac0",
            "_type": "span",
            "marks": []
          }
        ],
        "_type": "block",
        "style": "h3",
        "_key": "abf423cb7d97",
        "markDefs": []
      },
      {
        "_key": "652e82053359",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "For a simple buttercream frosting:",
            "_key": "177c53d32d760"
          }
        ],
        "_type": "block",
        "style": "normal"
      },
      {
        "_key": "ae08a18f5026",
        "markDefs": [],
        "children": [
          {
            "_key": "33c8a6408f590",
            "_type": "span",
            "marks": [],
            "text": "Ingredients:"
          }
        ],
        "_type": "block",
        "style": "h4"
      },
      {
        "_key": "1de8c3d2889f",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_key": "1965fc47fcc40",
            "_type": "span",
            "marks": [],
            "text": "1 cup (226 grams) unsalted butter, softened"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal"
      },
      {
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "ecd304de17cc",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "4 cups (480 grams) powdered sugar",
            "_key": "57c586863da10"
          }
        ]
      },
      {
        "_key": "1c1ecf3a7aa9",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "1/4 cup (60 ml) heavy cream",
            "_key": "236b6e2adc630"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal"
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "391287d6a763",
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "2 teaspoons vanilla extract",
            "_key": "13b08bd145e40"
          }
        ],
        "level": 1
      },
      {
        "listItem": "bullet",
        "markDefs": [],
        "children": [
          {
            "text": "Pinch of salt",
            "_key": "87628b2d463b0",
            "_type": "span",
            "marks": []
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "9bdd43d09e27"
      },
      {
        "children": [
          {
            "_key": "714df373e9d30",
            "_type": "span",
            "marks": [],
            "text": "Instructions:"
          }
        ],
        "_type": "block",
        "style": "h4",
        "_key": "b917acf6794b",
        "markDefs": []
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "acad8bba6b83",
        "listItem": "number",
        "markDefs": [],
        "children": [
          {
            "_key": "7cd25e53618a0",
            "_type": "span",
            "marks": [],
            "text": "In a large mixing bowl, beat the butter on medium speed until creamy."
          }
        ],
        "level": 1
      },
      {
        "_type": "block",
        "style": "normal",
        "_key": "ad17b462e376",
        "listItem": "number",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Gradually add the powdered sugar, one cup at a time, beating well after each addition.",
            "_key": "da0179b6fe9d0"
          }
        ],
        "level": 1
      },
      {
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Add the heavy cream, vanilla extract, and salt, and beat on high speed for about 3 minutes, until the frosting is light and fluffy.",
            "_key": "20faf25e75870"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "8c7d30cb914f",
        "listItem": "number"
      },
      {
        "_key": "321ce6a47063",
        "markDefs": [],
        "children": [
          {
            "marks": [],
            "text": "Assembling the Cake:",
            "_key": "d3692515ec4d0",
            "_type": "span"
          }
        ],
        "_type": "block",
        "style": "h3"
      },
      {
        "_key": "2a99ef19db86",
        "listItem": "number",
        "markDefs": [],
        "children": [
          {
            "marks": [],
            "text": "Place one cake layer on a serving plate.",
            "_key": "c7c7a5353ec10",
            "_type": "span"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal"
      },
      {
        "markDefs": [],
        "children": [
          {
            "marks": [],
            "text": "Spread a layer of frosting on top.",
            "_key": "26f4cacc1bfa0",
            "_type": "span"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "05ae32399a13",
        "listItem": "number"
      },
      {
        "_key": "df1bf967210b",
        "listItem": "number",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Place the second cake layer on top of the first.",
            "_key": "574ecd609d1e0"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal"
      },
      {
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Spread frosting on the top and sides of the cake.",
            "_key": "bc4f9abdfe4e0"
          }
        ],
        "level": 1,
        "_type": "block",
        "style": "normal",
        "_key": "1010159eb2d6",
        "listItem": "number"
      },
      {
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Enjoy:",
            "_key": "275c607eb9910"
          }
        ],
        "_type": "block",
        "style": "h3",
        "_key": "c5d9f8c489ff"
      },
      {
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Your vanilla cake is now ready to enjoy! Slice and serve as desired.",
            "_key": "562593919afd0"
          }
        ],
        "_type": "block",
        "style": "normal",
        "_key": "62fa099b77d2",
        "markDefs": []
      }
    ]
    const insets = useSafeAreaInsets();
    const [width, setWidth] = useState(Dimensions.get('window').width);
    useEffect(() => {
      setWidth(Dimensions.get('window').width);
    }, [Dimensions.get('window').width]);
    const customSerializers = {
      types: {
        block: (props) => {
          const { style = 'normal' } = props.value;
          const { children } = props.value;
    
          switch (style) {
            case 'h1':
              return <Text className="text-mint-87 text-3xl font-dm_SemiBold my-2">{children[0].text}</Text>;
            case 'h2':
              return <Text className="text-white_87 text-2xl font-dm_SemiBold my-2">{children[0].text}</Text>;
            case 'h3':
              return <Text className="text-white_87 text-xl font-dm_SemiBold my-2">{children[0].text}</Text>;
            case 'h4':
              return <Text className="text-white_87 text-lg font-dm_SemiBold my-2">{children[0].text}</Text>;
            case 'h5':
              return <Text className="text-white_87 text-md font-dm_SemiBold my-2">{children[0].text}</Text>;
            case 'h6':
              return <Text className="text-white_87 text-sm font-dm_SemiBold my-2">{children[0].text}</Text>;
            case 'blockquote':
              return <Text className="text-white_87 text-base italic my-2 dm_Regular">{children[0].text}</Text>;
            case 'normal':
            default:
              return <Text className="text-white_87 text-base my-2 dm_Regular">{children[0].text}</Text>;
          }
        }
      },
      marks: {
        strong: ({ children }) => <Text className="font-bold">{children}</Text>,
      },
          list: {
        bullet: ({ children }) => <View className="pl-2 flex flex-col flex-wrap mt-2">{children}</View>,
        number: ({ children }) => <View className="pl-2 flex flex-col flex-wrap mt-2">{children}</View>,
      },
      listItem: {
        bullet: ({ children }) => (
          <View className="flex-row items-start mt-0 mb-2 ">
          <Text className="text-white_87 mr-2 mt-1"> 
            <Octicons name="dot-fill" size={12} color="#fff" />
          </Text>
          <View className="flex flex-col flex-wrap justify-between ">
          {children.map((item,index)=>{
            const isNumber = item.props?.value?.children[0].listItem==="number";
            return isNumber ? item: <Text className={`text-white_87 font-inter_Regular leading-5`} key={index+item}
            style={{width:width-70}}
            >{item}</Text>
          })}
          </View>
        </View>
        ),
        number: ({ children, index }) => (
            <View className="flex-row items-start mt-0 mb-2">
              <Text className="text-white_87 mr-1">{index+1}. </Text>
              <View className="flex flex-col flex-wrap justify-between ">
              {children.map((item,index)=>{
                const isBullet = item.props?.value?.children[0].listItem==="bullet";
                return isBullet ? item: <Text className={`text-white_87 font-inter_Regular leading-5`} key={index+item}
                style={{width:width-50}}
                >{item}</Text>
              })}
              </View>
            </View>
        ),
      },
    };
    
    
  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Blog Page" />
        <ScrollView className="px-4 mt-2">
          <View className="flex flex-col">
            <Image source={require('../../assets/images/swimming.png')} style={{height: 200}} className="rounded-lg w-full" />
            <View className="flex flex-col">
              
              <Text className="text-white_87 font-pop_SemiBold text-lg mt-4">How does swimming helps you in keeping fit?</Text>
              <View className="flex flex-row mt-2 items-center ">
                <Image source={ProfilePic} style={{height: 25, width: 25}} className="rounded-full mr-2" />
                <Text className="text-white_38 font-inter_Regular text-xs">Anamika Malik</Text>
                <View className="flex-grow"></View> 
                <Text className="text-white_38 font-inter_Regular text-xs ml-1 justify-self-end pr-1">12/12/2021</Text>
              </View>
              <View className="h-px opacity-50 bg-white_38 w-full mt-2"></View>
              <View className="flex flex-col mt-6">
                <PortableText value={sampleData} components={customSerializers}
                className="text-white_87 font-inter_Regular"
                />
              </View>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BlogPage