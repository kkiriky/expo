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

### SafeArea & React Navigation

- React Navigation을 사용하는 경우 이미 SafeAreaProvider가 적용된 것
- header는 safe area내에서 있다는 것을 보장함.  
  그러나 header를 없애면 safe area가 보장되지 않으므로 반드시 SafeAreaView 또는 useSafeAreaInsets를 사용할 것(useSafeAreaInsets 권장)
