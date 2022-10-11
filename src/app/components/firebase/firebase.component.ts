import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {
  unsubscribeToCollection:any;


  constructor(private afs: AngularFirestore) {
  }
  ngOnDestroy(): void {
    this.unsubscribeToCollection();
  }
  images: any = [];


  ngOnInit(): void {
    //this.CreateDocumentByFullPath();
    // this.CreateDocumentByCollectionAndDocumentName();
    this.getAllDocumentsFromCollectionByTwoParameters('images', 2000,2000);
    //this.getAllDocumentsFromCollection('images');
    //this.fetcher();
    //this.getCollectionInRealTime('images');
  }

  

  CreateDocumentByFullPath(pathToDocument: string, data: any): void {
    this.afs.collection('images').doc(pathToDocument).set(data).then((success) =>
      console.log(success)).
      catch((error) => console.log(error));
  }

  getAllDocumentsFromCollection(collection: string) {
    this.afs.collection(collection).ref.get().then((documents) => {
      documents.forEach((doc) => {
        console.log(doc.data());
      })
    })
      .catch((error) => console.error(error));
  }


  fetcher() {
    let url = ('https://picsum.photos/v2/list');
    fetch(url).then((response) => response.json()).then((data) => {
      data.forEach((item: any) => {
        console.log(item)
        this.CreateDocumentByFullPath(item.id, item);
      })
    })
  }

  

  getAllDocumentsFromCollectionByTwoParameters(collection: string, height: any, width: any) {
    this.afs.collection(collection).ref.where("height", ">=", height),
      this.afs.collection(collection).ref.where("width", ">=", width).

      onSnapshot((documents) =>{
        this.images = [];
        documents.forEach((doc) =>{
          this.images.push(doc.data());
          console.log(doc.data());
        })
      },error => console.log(error))
       
    }
}


// CreateDocumentByCollectionAndDocumentName(): void {
  //   this.afs.collection('images ').doc('0').set({firstName:'John',
  //   lastName:'Doe',age:30}).then((success) => console.log(success)).catch((error)=>
  //   console.log(error));
  // }

  // CreateDocumentByFullPath(id: any, item: any) {
  //   throw new Error('Method not implemented.');
  // }



// getAllDocumentsFromCollectionByTwoParameters(collection: string, height: any, width: any) {
  //   this.afs.collection(collection).ref.where("height", ">=", height),
  //     this.afs.collection(collection).ref.where("width", ">=", width).

  //       get().then((documents) => {
  //         this.images = [];
  //         documents.forEach((doc) => {
  //           this.images.push(doc.data());
  //           console.log(doc.data());
  //         })
  //       })
  //       .catch((error) => console.error(error));
  // }



// getCollectionInRealTime(collection:string) {
  //   this.unsubscribeToCollection = this.afs.collection(collection).ref.onSnapshot((documents) =>{
  //     this.images = [];
  //     documents.forEach((doc) =>{
  //       this.images.push(doc.data());
  //       console.log(doc.data());
  //     })
  //   },error => console.log(error))
   
    
  // }