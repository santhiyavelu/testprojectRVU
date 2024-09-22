import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import planMockData from '../mock/planMockData.json';
import {Plan, Rate} from '../models/Plan_Model';

const HomeScreen = () => {
  const [planData, setPlanData] = useState<Plan | null>(null);

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPlanData(planMockData);
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };

  const renderRateItem = ({item}: {item: Rate}) => (
    <View style={styles.rateItem}>
      <Text style={styles.rateText}>Price: ${item.price.toFixed(2)}</Text>
      <Text style={styles.rateText}>Threshold: {item.threshold}</Text>
    </View>
  );

  //Display Calculations

  const calculateTotalCost = (usage: number) => {
    let totalCost = planData?.standing_charge || 0;

    for (const rate of planData?.rates || []) {
      if (usage > rate.threshold) {
        totalCost += rate.price * rate.threshold;
        usage -= rate.threshold;
      } else {
        totalCost += rate.price * usage;
        break;
      }
    }

    return totalCost;
  };

  const averageRate = () => {
    const totalPrice =
      planData?.rates.reduce((acc, rate) => acc + rate.price, 0) || 0;
    return totalPrice / (planData?.rates.length || 1);
  };

  const totalThreshold = () => {
    return planData?.rates.reduce((acc, rate) => acc + rate.threshold, 0) || 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plan Overview</Text>

      {planData ? (
        <>
          <Text style={styles.supplierText}>Supplier: {planData.supplier}</Text>
          <Text style={styles.planText}>Plan: {planData.plan}</Text>

          {/* Display calculations */}
          <Text style={styles.calculationText}>
            Total Cost (for 100 units): ${calculateTotalCost(100).toFixed(2)}
          </Text>
          <Text style={styles.calculationText}>
            Average Rate: ${averageRate().toFixed(2)}
          </Text>
          <Text style={styles.calculationText}>
            Total Threshold: {totalThreshold()}
          </Text>

          <FlatList
            data={planData.rates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRateItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  calculationText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#007BFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  supplierText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  planText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#555',
  },
  rateItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android
  },
  rateText: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
