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
- **재요청**을 했을 경우 서버에서 받은 **응답을 반환**해야만 함.

### FlatList

- **onEndReachedThreshold**: **전체 리스트의 높이 - (실제 화면에 보이는 리스트의 높이 x onEndReachedThreshold)** 에 도달했을 때 onEndReached가 실행  
  ex) 전체 리스트의 높이: 2000, 실제 화면에 보이는 리스트의 높이: 600, onEndReachedThreshold: 0.5  
  => 2000 - (600 x 0.5) = 1700  
  => 1700 이상을 넘어갔을 때, onEndReached 트리거
  => 즉, 전체 리스트의 최하단을 기준으로 300만큼 떨어진 지점에 도달하면 트리거
- FlatList 내부에는 **ScroolView** 컴포넌트가 존재 / *contentContainerStyle*과 관련
- ScrollView: **"flewGrow: 1"** 이 default value
  - ScrollView에 높이(_absolute size_)를 설정하면 스크롤이 동작하지 않음
  - 따라서 FlatList의 contentContainerStyle에 flex:1을 설정하면 *absolute size*가 되어버리므로 스크롤이 동작하지 않게 됨

> **flex 1 vs flexGrow 1**
>
> - flex:1(**Absolute Sizing**) => flex-grow: 1 / flex-shrink: 1 / flex-basis: 0
> - flexGrow:1(**Relative Sizing**) => flex-grow: 1 / flex-shrink: 1 / flex-basis: auto  
>   https://stackoverflow.com/questions/43520932/make-flex-grow-expand-items-based-on-their-original-size

### SafeArea & React Navigation

- React Navigation을 사용하는 경우 이미 SafeAreaProvider가 적용된 것
- header와 bottom tab은 safe area내에서 있다는 것을 보장함.  
  그러나 header를 없애면 safe area가 보장되지 않으므로 반드시 SafeAreaView 또는 useSafeAreaInsets를 사용할 것(useSafeAreaInsets 권장)
- Stack Screen에서는 bottom tab이 없기 때문에, 하단에는 Safe Area Inset이 적용되지 않음.  
  필요에 따라 하단에 inset이 필요한 경우, useSafeAreaInsets를 이용하여 bottom에 적용

### React Navigation

- Route Prop
  - Route Prop으로 상태값을 넘기는 것은 상태값을 복사한 값을 넘기는 것
  - 따라서 상태가 변경되어도 리렌더링이 발생하지 않음
- nesting navigation
  - navigation.push('MainTab', {screen: 'Orders'})

> - headerBackVisible: 현재 스크린에서 back button과 back title을 보여줄지
> - headerLeft: 현재 스크린에서 headerBack 위치에 컴포넌트를 위치시킴  
>   back button과 같이 보여주려면 headerBackVisible: true 로 설정
> - headerBackTitle: 이전스크린이라는데, 동작안함
> - headerBackTitleVisible: 이전 스크린

### React Query

- **initialData**를 설정하면 캐시에 값이 남음.
- **staleTime**과 같이 설정하면, initialData 캐시가 있으므로, 초기에 데이터 요청을 하지 않음
- **initialData** 또는 **placeholderData**를 이용하여 부분 데이터를 미리 보여줄 수 있음.
- **initialData** 또는 **placeholderData**를 설정하면 isLoading이 false가 됨.  
  => 부분 데이터의 유무(post.detail)와 isFetching을 조합하여 isLoading을 만들어서 사용

### React Native Reanimated

- **withSequence**: ???

### Toast

- react-native-toast-messsage

### Alert

- android에서는 style 설정이 안되므로, Modal을 직접 만들어서 사용

### Modal

- Recoil을 이용하여 모달을 전역에서 관리하고, imperative 으로 사용 가능

### Action Sheet

- @expo/react-native-action-sheet: IOS는 native / Android는 pure JS

### EAS Build & EAS Updates

#### 초기 설정

- expo install expo-updates && eas update:configure && eas build:configure

#### 업데이트

- eas update --branch preview --message "메시지"
