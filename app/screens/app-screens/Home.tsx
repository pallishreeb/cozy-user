import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/homeHeader';
import CategoryCard from '../../components/categoryCard';
import useCategories, {Category, Service} from '../../hooks/useCategories';
import Loader from '../../components/loader';
import {IMAGE_URL} from '../../constants';
export default ({navigation}) => {
  const {categories, isLoading, error} = useCategories();
  const [keyword, setKeyword] = useState<string | undefined>('');
  let handleNavigation = () => {
    navigation.navigate('Notification');
  };
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <Text>{error.message}</Text>;
  }
  const renderService = ({item}: {item: Service}) => {
    let images = JSON.parse(item?.images);
    const serviceImageUri = item?.images[0]
      ? `${IMAGE_URL}${images[0]}`
      : 'https://via.placeholder.com/150';

    return (
      <CategoryCard
        label={item.name}
        onPress={() => {
          navigation.navigate('SearchResult', {keyword: item?.name});
        }}
        source={{uri: serviceImageUri}}
      />
    );
  };

  const renderTopCategory = ({item}: {item: Category}) => {
    const categoryImageUri = item?.image
      ? `${IMAGE_URL}/category_images/${item?.image}`
      : 'https://via.placeholder.com/150';
    return (
      <CategoryCard
        label={item.name}
        onPress={() => {
          navigation.navigate('SearchResult', {keyword: item?.name});
        }}
        source={{uri: categoryImageUri}}
      />
    );
  };

  const renderCategoryServices = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    if (item.services.length === 0) {
      return null; // Skip rendering categories with no services
    }

    const isGradient = index % 2 === 0;
    // Only define gradientProps within the scope it's needed
    const renderContent = () => (
      <>
        <View style={styles.categoryHeaderContainer}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
        </View>
        <View style={styles.categoryHeaderContainer}>
          <FlatList
            data={item.services}
            renderItem={renderService}
            keyExtractor={service => `${service.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </>
    );

    if (isGradient) {
      return (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#FC5A54', '#E6E6E6']}
          style={styles.linearGradientStyle}>
          {renderContent()}
        </LinearGradient>
      );
    } else {
      // Use a regular View when no gradient is needed
      return renderContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        handleNavigation={handleNavigation}
        handleSearch={text => {
          setKeyword(text);
        }}
        onPressSearch={() => {
          navigation.navigate('SearchResult', {keyword});
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <View style={styles.categoryHeaderContainer}>
          <Text style={[styles.categoryTitle]}>{'Top Categories'}</Text>
        </View>
        <View style={styles.categoryHeaderContainer}>
          <FlatList
            data={categories}
            renderItem={renderTopCategory}
            keyExtractor={category => `${category.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {categories?.length > 0 &&
          categories.map((category, index) => (
            <React.Fragment key={category.id}>
              {renderCategoryServices({item: category, index})}
            </React.Fragment>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 20,
    // paddingHorizontal: 15,
  },
  categoryImage: {
    borderRadius: 14,
    width: 123,
    height: 97,
  },
  linearGradientStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#6D5C38',
    // '#505050'
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
