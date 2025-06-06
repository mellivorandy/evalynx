<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('judges', function (Blueprint $table) {
            $table->unsignedBigInteger('id'); 
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('team_name')->nullable();
            $table->boolean('completed')->default(false);
            $table->integer('score1');
            $table->integer('score2');
            $table->integer('score3');
            $table->integer('score4');
            $table->timestamps();

            $table->foreign('id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('judges');
    }
};
