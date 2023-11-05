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

Ändere dafür nicht die bestehende Liste, nutze dafür [useState](https://react.dev/reference/react/useState) und [useEffect](https://react.dev/reference/react/useEffect)

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
