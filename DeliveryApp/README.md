# Delivery App

#### BottomTab Navigation

- tabBarActiveTintColor: 아이콘에 color prop을 할당해야만 적용됨

#### TextInput Props

- keyboardType
- returnKeyType
- secureTextEntry
- autoCapitalize
- autoCorrect

### Interceptor

- 에러 인터셉터:
  - **return**: **이전 요청에 대한 응답**
  - **throw**: **이전 요청에 대한 에러**
- 에러 인터셉터 처리 중 **재요청**을 해서 받은 **응답을 반환**해야만 함.

### FlatList

- **onEndReachedThreshold**: **전체 리스트의 높이 - (실제 화면에 보이는 리스트의 높이 x onEndReachedThreshold)** 에 도달했을 때 onEndReached가 실행  
  ex) 전체 리스트의 높이: 2000, 실제 화면에 보이는 리스트의 높이: 600, onEndReachedThreshold: 0.5  
  => 2000 - (600 x 0.5) = 1700  
  => 1700 이상을 넘어갔을 때, onEndReached 트리거
  => 즉, 전체 리스트의 최하단을 기준으로 300만큼 떨어진 지점에 도달하면 트리거
- FlatList 내부에는 **ScroolView** 컴포넌트가 존재 / *contentContainerStyle*과 관련
- ScrollView: **"flewGrow: 1"** 이 default value
  - ScrollView에 높이(absolute size)를 설정하면 스크롤이 동작하지 않음
  - 따라서 FlatList의 contentContainerStyle에 flex:1을 설정하면 절대적인 크기가 되어버리므로 스크롤이 동작하지 않게됨

> **flex 1 vs flexGrow 1**
>
> - flex:1(**Absolute Sizing**) => flex-grow: 1 / flex-shrink: 1 / flex-basis: 0
> - flexGrow:1(**Relative Sizing**) => flex-grow: 1 / flex-shrink: 1 / flex-basis: auto
>   https://stackoverflow.com/questions/43520932/make-flex-grow-expand-items-based-on-their-original-size

### SafeArea & React Navigation

- React Navigation을 사용하는 경우 이미 SafeAreaProvider가 적용된 것
- header는 safe area내에서 있다는 것을 보장함.  
  그러나 header를 없애면 safe area가 보장되지 않으므로 반드시 SafeAreaView 또는 useSafeAreaInsets를 사용할 것(useSafeAreaInsets 권장)

### React Navigation

- Route Prop
  - Route Prop으로 상태값을 넘기는 것은 상태값을 복사한 값을 넘기는 것
  - 따라서 상태가 변경되어도 리렌더링이 발생하지 않음
- nesting navigation
  - navigation.push('MainTab', {screen: 'Orders'})

### React Query

- **initialData**를 설정하면 캐시에 값이 남음.
- **staleTime**과 같이 설정하면, initialData 캐시가 있으므로, 초기에 데이터 요청을 하지 않음
- **initialData** 또는 **placeholderData**를 이용하여 부분 데이터를 미리 보여줄 수 있음.
