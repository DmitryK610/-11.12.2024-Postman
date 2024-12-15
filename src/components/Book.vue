<template>
<div>
<h1>Список книг</h1>
<ul>
<li v-for="book in Books" :key="book.author">
{{ book.author}} {{ book.name }} - {{ book.year }}

</li>
</ul>
<div v-if="error">{{ error }}</div>
<div v-if="loading">Загрузка...</div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
class Book {
author: string;
name: string;
year: Number;
}
export default defineComponent({
name: 'Book',
setup() {
const Books = ref<Book[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const fetchBooks = () => {
return from(
ajax.getJSON<Book[]>('https://073b71c5-5682-43c1-8286-fb298f41aae8.mock.pstmn.io/books')
).pipe(
map((response) => {
loading.value = false;
return response;
}),
catchError((err) => {
loading.value = false;
error.value = 'Ошибка при загрузке данных';
return [];
})
);
};
onMounted(() => {
    fetchBooks().subscribe({
next: (data) => {
Books.value = data;
},
error: (err) => {
console.error('Error fetching users:', err);
},
});
});
return {
Books,
loading,
error,
};
},
});

</script>