import { ActivityIndicator, Pressable, Text} from "react-native";

const CustomButton = ({
  title,
  handlePress,
//   containerStyles,
  isLoading,
  isDetail,
  customStyle,
  textStyle,
  endIcon,
  startIcon,
  disabled
}) => {
  return (
    <Pressable
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-lava rounded w-max min-h-[40px] flex flex-row justify-center items-center mx-auto ${isDetail?"px-4":"px-8"} ${isLoading ? "opacity-50" : ""} ${customStyle} ${disabled?"opacity-70":""}`}
      disabled={isLoading || disabled}
    >
      {startIcon?? ""}
      <Text className={`text-white mr-2 font-dm_Medium ${isDetail?"text-base":"text-lg"} ${textStyle}`}>
        {title}
      </Text>
      {endIcon ?? ""}
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </Pressable>
  );
};

export default CustomButton;
