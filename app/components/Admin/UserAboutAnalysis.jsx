import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions, ImageBackground, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Wave2 from '../../../assets/images/Wave2.png';
import { fetchUserCompleted, fetchUserRequested, fetchUserUpcoming } from '../../../lib/Users/Schedule';
import { Toast } from 'toastify-react-native';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import NotFound from '../../../assets/images/No data-pana 1.png';

const Instance = ({title,value,color}) => {
    return (
        <View className="flex flex-row items-center justify-between w-[80%] mb-3">
            <View className="flex flex-row items-center">
                <View className={`w-[12px] h-[12px] rounded-full mt-1 mr-3 ${color}`}/>
                <Text className="text-white_87 text-base font-inter_Regular">{title}</Text>
            </View>
            <Text className="text-white_87 text-base font-inter_Regular">{value}</Text>
        </View>
    )
}
const UserAboutAnalysis = ({id}) => {
  const [upcoming, setUpcoming] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [requested, setRequested] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useGlobalContext();
  const fetchSchedules = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const upcoming = await fetchUserUpcoming(token, id);
      const completed = await fetchUserCompleted(token, id);
      const requested = await fetchUserRequested(token, id);

      setUpcoming(upcoming.length);
      setCompleted(completed.length);
      setRequested(requested.length);
    } catch (error) {
      console.error('Error fetching schedules:', error.message);
      Toast.error('Error fetching schedules', 'top');
    }finally{
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchSchedules();
    console.log('fetching schedule');
    // unmount
    return () => {
      setUpcoming(0);
      setCompleted(0);
      setRequested(0);
    }
    },[token,id]);

  const data = useMemo(() => [
    {
      name: 'Upcoming',
      population: upcoming,
      color: '#D8730A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Completed',
      population: completed,
      color: '#73C34D',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Requested',
      population: requested,
      color: '#1F67FF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ], [upcoming, completed, requested]);

  
  return (
    <View className="mx-4" style={{ margin: 0, marginTop: 25, overflow: 'visible' }}>
      <View className="flex flex-row items-center justify-between mb-4">
        <Text className="text-white_87 text-xl font-inter_Medium">Schedule Analysis</Text>
      </View>
        <View className="border-1 border-lava border rounded-2xl overflow-hidden bg-tertiary pb-8 relative h-[480px] ">
            <Image  source={Wave2} style={{width: '110%', height: 280,}} className="absolute bottom-0 -left-2 right-0"
             />
             {upcoming === 0 && completed === 0 && requested === 0 ? 
             <View className="w-full flex items-center h-full justify-center">
              { isLoading ?
                <Text className="text-white_87 text-lg font-inter_Regular mt-2  text-center relative bottom-4">Loading...</Text>
                :
                <>
                <Image source={NotFound} className="w-[200px] h-[200px]" />
                <Text className="text-white_87 text-lg font-inter_Regular mt-2  text-center relative bottom-4 w-2/3">Not Enough Schedules to Show</Text>
                </>
          }
             </View>:
             <>
            <View className="relative  flex self-center w-[280px] ">
                <View className="absolute w-full h-full top-0 left-0 flex items-center justify-center z-10">
                    <View className="flex flex-col bg-primary rounded-full w-[130px] h-[130px] items-center justify-center">
                        <Text className="text-white_87 text-4xl font-cinzel_Bold">{completed + requested + upcoming}</Text>
                        <Text className="text-white_60 text-sm font-inter_Medium w-[80%] text-center">Total Schedule</Text>
                    </View>
                </View>
                <PieChart
                data={data}
                width={280}
                height={280}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                hasLegend={false}
                absolute
                paddingLeft={70}
                />
            </View>
            <Text className="text-white_87 text-lg font-inter_Regular mt-2 w-full text-center relative bottom-4">Monthly Activity</Text>   
            <View className="flex flex-col items-center justify-center mt-6">
                <Instance title="Upcoming" value={upcoming} color={"bg-upcoming"} />
                <Instance title="Completed" value={completed} color={"bg-completed"} />
                <Instance title="Requested" value={requested} color={"bg-requested"} />  
            </View>
            </>
            }
        </View>
    </View>
  );
};

export default memo(UserAboutAnalysis);