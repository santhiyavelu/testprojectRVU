import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  BackHandler,
} from 'react-native';
import {calculateAnnualCharge} from '../utils';
import {plansData} from '../mock/planMockData';

const annualUsage = 100;

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    const cost = calculateAnnualCharge(plan, annualUsage);
    setTotalCost(cost);
  };

  const handleExitPlan = () => {
    setSelectedPlan(null);
    setTotalCost(null);
  };

  const renderPlanItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.planItem}
      onPress={() => handleSelectPlan(item)}>
      <Text style={styles.planText}>
        Supplier: {item.supplier} - Plan: {item.plan}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Supplier</Text>
      <FlatList
        data={plansData}
        keyExtractor={item => item.supplier}
        renderItem={renderPlanItem}
        style={styles.planList}
      />

      {selectedPlan && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Selected Plan:</Text>
          <Text style={styles.detailsText}>
            Supplier: {selectedPlan.supplier}
          </Text>
          <Text style={styles.detailsText}>Plan: {selectedPlan.plan}</Text>
          {totalCost !== null && (
            <Text style={styles.detailsText}>
              Total Cost: £{totalCost.toFixed(2)}
            </Text>
          )}
          <Button title="Exit" onPress={handleExitPlan} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  planList: {
    marginBottom: 20,
  },
  planItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 10,
  },
  planText: {
    fontSize: 18,
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    marginTop: 20,
  },
  detailsText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PlanSelector;
