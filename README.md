# React extended FE

## How to start

- ensure the BE is already running
- run `npm run dev` on the terminal

## Login credentials

- user : 33608
- user : 69274
- user : 83643
- user : 84496
- Admin: 22222 Password: abc123

## Aufgabe 1

Als ein Benutzer möchte ich die Möglichkeit haben, markierte Produkte in der Produktliste durch Drücken der Taste 'A' auf meiner Tastatur direkt in den Warenkorb zu legen, damit ich eine schnellere und effizientere Einkaufserfahrung genießen kann, ohne die Maus benutzen zu müssen.

Passen Sie den ShopTable.tsx mit [useEffect](https://react.dev/reference/react/useEffect) und [document.addEventListener()](https://www.w3schools.com/jsref/met_document_addeventlistener.asp) an, sodass ein markiertes Produkt in der Tabelle durch Drücken der Taste 'A' auf der Tastatur zum Warenkorb hinzugefügt werden kann.

## Aufgabe 2

Als Benutzer möchte ich, dass die Produkte in der Tabelle automatisch in alphabetischer Reihenfolge sortiert sind, damit ich eine geordnete Übersicht habe und schnell das gewünschte Produkt finden kann.

Ändere dafür nicht die bestehende Liste, nutze dafür [useState](https://react.dev/reference/react/useState) und [useEffect](https://react.dev/reference/react/useEffect

## Aufgabe 3

Als Entwickler möchte ich, dass die Produkttabelle nur dann neu gerendert wird, wenn sich die Produktliste ändert,
damit die Anwendungsleistung verbessert wird und unnötige Renderings vermieden werden.

Nutze dafür [useMemo](https://react.dev/reference/react/useMemo) im `ShopPage.tsx`

## Aufgabe 4

Als Nutzer möchte ich beim Betreten der Produktauswahl-Seite, dass die Suchleiste automatisch fokusiert wird, damit ich sofort mit der Suche starten kann.

Nutze dafür [useRef](https://react.dev/reference/react/useRef) und [inputRef](https://mui.com/material-ui/api/input/#Input-prop-inputRef)

Extra: Die Suche soll über die Beschreibung und Proukt gehen

## Aufgabe 5

Als Entwickler möchte ich einen Custom Hook erstellen, der das Handling der Produkte zentralisiert, damit Funktionen wie das Laden der bestehenden Produkte nur an einer Stelle im Code erfolgen und Wiederverwendbarkeit sowie Übersichtlichkeit verbessert werden.

```js
useEffect(() => {
  const fetch = async () => {
    const availableProducts = await getProducts();
    dispatch({ type: "AVAILABLE_PRODUCTS", payload: availableProducts });
  };

  if (state.products.length === 0) {
    fetch();
  }
}, []);
```

## Wissenswertes zu Headless Components

https://martinfowler.com/articles/headless-component.html

## Aufgabe Context API - Locale

Als Benutzer möchte ich die Fähigkeit haben, die Sprache der Anwendung zwischen Deutsch und Englisch zu wechseln. Dies soll intuitiv über einen Button möglich sein, der angezeigt wird, wenn ich auf mein Profilbild klicke. Auf diese Weise kann ich die Anwendung in der Sprache nutzen, die ich bevorzuge.

Erstellen einen LocaleContext und den dazugehörigen LocaleProvider, der in der gesamten Anwendung verfügbar ist. Nutzte dafür die [contextAPI](https://react.dev/reference/react/createContext) und [useContext](https://react.dev/reference/react/useContext).
Der LocaleProvider soll eine Funktion switchLocale bereitstellen, die es ermöglicht, die aktuelle Sprache zu wechseln.
Die Sprachänderung soll ohne Neuladen der Seite und unter Beibehaltung des aktuellen Anwendungszustands stattfinden.
Nutzte die `locales.ts`-Datei

## Aufgabe Context API - Integration der Rechnungsdaten in den globalState

Als Entwickler möchte ich, dass die Rechnungen in der `InvoiceList.tsx` Komponente nach demselben Muster im globalState abgelegt werden, wie es bereits bei den Produktdaten der Fall ist. Dies soll ein einheitliches Handling der verschiedenen Datentypen gewährleisten und mir erlauben, auf konsistente Weise auf die Rechnungsdaten von überall in der Anwendung aus zugreifen zu können.

Extra: `CustomerList.tsx` auch anpassen

## Aufgabe Redux

Als Entwickler möchte ich, dass der bestehende globalContext, der derzeit mit der ContextAPI implementiert ist, zu Redux migriert wird. Ziel ist es, von den Vorteilen von Redux zu profitieren, wie zum Beispiel dem verbesserten State-Management, der Zeitreise-Fähigkeit für Debugging und dem Ökosystem an Middleware, um eine robustere und skalierbare Anwendungsarchitektur zu schaffen.

Die Actions und reducer in der `reducer.ts` sollen alle zu redux migriert werden. Auch alle `dispatch` aufrufen sowie der userReducer-Hook und der globalState sind nach der Migration aus dem Code zu entfernen.

Nutze für die Erstellung des Reducer die [`createSlice`](https://redux.js.org/tutorials/quick-start#create-a-redux-state-slice) Funktion aus `@reduxjs/toolkit`

siehe [redux quick start](https://redux.js.org/tutorials/quick-start)

<details>
<summary> Fortgechrittene Redux Funktionen (Optional)</summary>
Das Thema optinal!!

Wer mehr über Redux und asynchrone Aufrufe erfahren möchten, kann sich folgende Links anschauen.

- https://redux-toolkit.js.org/api/createAsyncThunk
- https://dev.to/ifeanyichima/what-is-createasyncthunk-in-redux--mhe
</details>
