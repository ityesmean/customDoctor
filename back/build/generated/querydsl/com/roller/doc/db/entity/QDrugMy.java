package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDrugMy is a Querydsl query type for DrugMy
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDrugMy extends EntityPathBase<DrugMy> {

    private static final long serialVersionUID = -1335337708L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDrugMy drugMy = new QDrugMy("drugMy");

    public final BooleanPath drug_my_del = createBoolean("drug_my_del");

    public final NumberPath<Long> drug_my_id = createNumber("drug_my_id", Long.class);

    public final StringPath drug_my_memo = createString("drug_my_memo");

    public final StringPath drug_my_title = createString("drug_my_title");

    public final ListPath<DrugMyPill, QDrugMyPill> drugMyPills = this.<DrugMyPill, QDrugMyPill>createList("drugMyPills", DrugMyPill.class, QDrugMyPill.class, PathInits.DIRECT2);

    public final QUser user;

    public QDrugMy(String variable) {
        this(DrugMy.class, forVariable(variable), INITS);
    }

    public QDrugMy(Path<? extends DrugMy> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDrugMy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDrugMy(PathMetadata metadata, PathInits inits) {
        this(DrugMy.class, metadata, inits);
    }

    public QDrugMy(Class<? extends DrugMy> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

