import PropTypes from 'prop-types';
import { useState } from 'react';
import { Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { styles } from './style';

export default function ChartScreen({ data }) {
  const [focusedIndex, setFocusedIndex] = useState(null);
  return (
    <LineChart
      data={data}
      height={300}
      width={300}
      spacing={45}
      initialSpacing={20}
      endSpacing={10}
      adjustToWidth={true}
      color="#177AD5"
      thickness={2}
      yAxisColor="#333"
      xAxisColor="#333"
      isAnimated
      animationDuration={1200}
      dataPointsColor="#177AD5"
      dataPointsRadius={4}
      showDataPoints
      startFillColor="#177AD5"
      endFillColor="#FFFFFF"
      startOpacity={0.4}
      endOpacity={0.1}
      areaChart
      focusEnabled
      showStripOnFocus
      showTextOnFocus
      showVerticalLine
      verticalLineUptoDataPoint={true}
      verticalLineColor="rgba(0,0,0,0.5)"
      xAxisLabelTexts={data.map((item) => item.name.toString())}
      xAxisTextNumberOfLines={1}
      yAxisTextStyle={styles.textStyle}
      xAxisLabelTextStyle={styles.textStyle}
      maxValue={Math.max(...data.map((item) => item.value)) + 50}
      showMaxValueLabel
      yAxisLabelWidth={80}
      noOfSections={10}
      tooltipColor="#177AD5"
      tooltipTextColor="white"
      tooltipTextFontSize={12}
      scrollAnimation
      scrollEventThrottle={16}
      showScrollIndicator
      indicatorColor="#177AD5"
      dataPointLabelWidth={80}
      stepValue={200}
      onFocus={(item, index) => {
        setFocusedIndex(index); // Atualiza o índice focado
      }}
      onBlur={() => setFocusedIndex(null)} // Reseta ao sair
      dataPointLabelShiftX={
        focusedIndex === data.length - 1
          ? -35 // Valor maior para o último ponto
          : focusedIndex === 0
            ? 35 // Ajuste para o primeiro ponto
            : 0 // Valor padrão para outros pontos
      }
      formatYLabel={(label) => {
        const num = Number(label);
        return `R$ ${num.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }}
      // eslint-disable-next-line no-unused-vars
      dataPointLabelComponent={(item, index) => (
        <Text style={styles.label}>
          {`R$ ${item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </Text>
      )}
      dataPointLabelShiftY={
        focusedIndex === data.length - 1
          ? 0 // Valor maior para o último ponto
          : focusedIndex === 0
            ? 2 // Ajuste para o primeiro ponto
            : -10 // Valor padrão para outros pontos
      }
      //yAxisOffset={Math.min(...data.map(item => item.value))}
    />
  );
}

ChartScreen.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
};
