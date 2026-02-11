export const getChartTheme = (isDark: boolean) => ({
    color: isDark
        ? ['#e71464', '#50e3c2', '#7e2ceb', '#fff8e3', '#bbb9ac']
        : ['#7e2ceb', '#e71464', '#37393e', '#50e3c2', '#7f7f7f'],

    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Plus Jakarta Sans, sans-serif' },

    title: {
        textStyle: {
            color: isDark ? '#ffffff' : '#37393e',
            fontWeight: 600,
            fontSize: 16
        },
        top: 5,
        left: 'center'
    },
    legend: {
        textStyle: { color: isDark ? '#dbd9da' : '#7f7f7f' },
        bottom: 0,
        padding: [10, 0],
        type: 'scroll'
    },
    grid: {
        top: 90,
        bottom: 100,
        left: 60,
        right:40,
        containLabel: true
    },
    tooltip: {
        backgroundColor: isDark ? '#0c0230' : '#ffffff',
        borderColor: isDark ? '#7e2ceb' : '#dbd9da',
        textStyle: { color: isDark ? '#ffffff' : '#37393e' },
        padding: 12,
        borderRadius: 8,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        confine: true
    },
    xAxis: {
        axisLine: { lineStyle: { color: isDark ? '#7f7f7f' : '#37393e' } },
        axisLabel: {
            color: isDark ? '#ffffff' : '#37393e',
            fontSize: 11,
            fontWeight: 'bold',
            textBorderColor: isDark ? '#000427' : 'transparent',
            textBorderWidth: isDark ? 3 : 0,
            hideOverlap: true,
            rotate: 45,
            interval: 'auto'
        },
        nameTextStyle: {
            color: isDark ? '#dbd9da' : '#7f7f7f',
            padding: [0, 0, 0, 10]
        }
    },
    yAxis: {
        splitLine: { lineStyle: { color: isDark ? '#37393e' : '#dbd9da', type: 'dashed' } },
        axisLabel: {
            color: isDark ? '#ffffff' : '#37393e',
            fontSize: 11,
            fontWeight: 'bold',
            textBorderColor: isDark ? '#000427' : 'transparent',
            textBorderWidth: isDark ? 3 : 0,
        },

        nameTextStyle: {
            color: isDark ? '#dbd9da' : '#7f7f7f',
            align: 'left',
            padding: [0, 0, 0, -30]
        }
    }
});